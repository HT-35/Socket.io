// yếu cầu server kết nối với client
const socket = io();
const creenChat = document.querySelector(".app__messages");

// ./imgMap/10.951819N106.868286E.png

const createText = ({ username, creatAt, Textclear, pathimg }) => {
  if (Textclear.includes("https://www.google.com/maps?q=")) {
    return `<div class="message-item">
                  <div class="message__row1">
                    <p class="message__name"> ${username} </p>
                    <p class="message__date"> ${creatAt}</p>
                  </div>
                  <div class="message__row2">
                    <p class="message__content">
                       <a href="${Textclear}">${Textclear}</a>
                    </p>
                  </div>
                  <div class="chat-message">
                    <a href="${Textclear}" target="_blank">
                      <div class="img_map_div">
                        <img class="img_map" src="./imgMap/${pathimg}" alt="Google Maps Preview">
                      </div>
                    </a>
                </div>
                </div>`;
  } else {
    return `<div class="message-item">
                    <div class="message__row1">
                      <p class="message__name"> ${username} </p>
                      <p class="message__date"> ${creatAt}</p>
                    </div>
                    <div class="message__row2">
                      <p class="message__content">
                        ${Textclear}
                      </p>
                    </div>
                  </div>`;
  }
};

document.getElementById("form-messages").addEventListener("submit", (e) => {
  e.preventDefault();

  // console.log("hello");
  const messageText = document.getElementById("input-messages");
  const valueMess = messageText.value;

  if (valueMess !== "") {
    // console.log(messageText);
    const acknowledgements = (errors) => {
      if (errors) {
        return alert("tin nhắn không hợp lệ");
      }
      console.log("tin nhắn đã gửi thành công");
    };
    socket.emit(
      "send message from client to server",
      valueMess,
      acknowledgements
    );
  }

  messageText.value = "";

  // document.querySelector("#buttonSubmit").addEventListener("click", () => {
  //   messageText.value = "";
  // });
});

socket.on("remessage from server to client", async ({ username, texted }) => {
  // console.log(texted);
  const { Textclear, creatAt } = texted;

  // const templateLi = `<div class="message-item">
  //           <div class="message__row1">
  //             <p class="message__name"> ${username} </p>
  //             <p class="message__date"> ${texted.creatAt}</p>
  //           </div>
  //           <div class="message__row2">
  //             <p class="message__content">
  //               ${texted.Textclear}
  //             </p>
  //           </div>
  //         </div>`;
  const templateLi = await createText({
    username,
    creatAt,
    Textclear,
  });

  creenChat.insertAdjacentHTML("beforeend", templateLi);
});

// gửi vị trí
document.getElementById("btn-share-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("trình duyệt đang dùng không có hổ trợ tìm ví");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    console.log("position from client : ", position);
    const { latitude, longitude } = position.coords;
    socket.emit("share location from client to server", {
      latitude,
      longitude,
    });
  });
});

socket.on("share Url location from server to client", async (Location) => {
  const { Textclear, creatAt } = Location.locationtime;
  const pathimg = Location.pathimg;
  console.log("pathimg", pathimg);
  const username = Location.username;
  const templateLocation1 = await createText({
    username,
    creatAt,
    Textclear,
    pathimg,
  });
  // console.log(templateLocation1);
  // templateLocation1 += templateLocation1;

  creenChat.insertAdjacentHTML("beforeend", templateLocation1);
});

// xử lý query string
const queryString = location.search;

const params = Qs.parse(queryString, {
  ignoreQueryPrefix: true,
});

const { room, username } = params;

socket.emit("send params from client to server", { room, username });

const ul = document.querySelector(".app__list-user--content");

// nhận user list và hiển thị lên màn hình
socket.on("send userList From Server to Client", (userList) => {
  console.log(userList);

  // Xóa tất cả phần tử con của ul
  ul.innerHTML = "";

  for (let i = 0; i < userList.length; i++) {
    const template = `<li class="app__item-user">${userList[i].username}</li>`;
    ul.insertAdjacentHTML("beforeend", template);
  }
});

//  ======================================================================
