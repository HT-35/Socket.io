const puppeteer = require("puppeteer");
const fs = require("fs").promises;

// Func tạo ảnh xem trước bản đồ
async function generateMapPreview(googleMapsLink) {
  // Tạo một trình duyệt mới
  const browser = await puppeteer.launch({
    headless: "new", // Sử dụng chế độ Headless mới
  });
  const page = await browser.newPage();

  // Mở liên kết Google Maps
  await page.goto(googleMapsLink);
  // Set screen size
  //   await page.setViewport({ width: 1280, height: 720 });

  // Chờ một khoảng thời gian ngắn để đảm bảo bản đồ đã tải
  await page.waitForTimeout(300);

  // Chụp màn hình và lưu dưới dạng base64
  const screenshot = await page.screenshot({ encoding: "base64" });

  // Đóng trình duyệt
  await browser.close();

  return screenshot;
}

// Func lưu ảnh bản đồ
const saveImgMap = async (loca) => {
  const location = `https://www.google.com/maps?q=${loca.latitude},${loca.longitude}`;
  const imagePath = `app/public/imgMap/${loca.latitude}N${loca.longitude}E.png`;

  try {
    const screenshot = await generateMapPreview(location);
    await fs.writeFile(imagePath, screenshot, "base64");
    console.log("Hình ảnh đã được lưu tại", imagePath);
    return await imagePath;
  } catch (err) {
    console.error("Lỗi khi lưu hình ảnh:", err);
    return err;
  }
};

module.exports = saveImgMap;
