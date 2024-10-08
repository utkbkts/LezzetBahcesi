import catchAsyncError from "../middleware/catch.middleware.js";
import About from "../models/about.models.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

const uploadImages = async (images, folder) => {
  // Resimleri yüklemek için yardımcı bir fonksiyon
  return Promise.all(images.map((image) => upload_file(image, folder)));
};

const deleteImages = async (images) => {
  // Resimleri silmek için yardımcı bir fonksiyon
  return Promise.all(images.map((image) => delete_file(image.public_id)));
};

const aboutCreate = catchAsyncError(async (req, res) => {
  const { staticModal, introduction, chefs, mission, whoImChoose } = req.body;
  // Null Kontroller
  if (!staticModal || !introduction || !chefs) {
    return res.status(400).json({ message: "Geçersiz veri." });
  }

  const aboutFind = await About.findOne().lean();

  // Resimleri yükle
  const staticModalImages = await uploadImages(
    staticModal[0]?.staticImages || [],
    "shopit/about"
  );
  const chefImage = await upload_file(chefs[0]?.imagesChefs, "shopit/about");
  const introductionImages = await upload_file(
    introduction[0].imagesIntro,
    "shopit/about"
  );

  if (aboutFind) {
    // Eski resimleri sil
    await deleteImages(aboutFind.staticModal[0].staticImages);
    await delete_file(aboutFind.chefs[0].imagesChefs.public_id);
    await delete_file(aboutFind.introduction[0].imagesIntro.public_id);

    // Güncellenmiş veriyi kaydet
    const updated = await About.findByIdAndUpdate(
      aboutFind._id,
      {
        staticModal: [{ ...staticModal[0], staticImages: staticModalImages }],
        introduction: [{ ...introduction[0], imagesIntro: introductionImages }],
        chefs: [{ ...chefs[0], imagesChefs: chefImage }],
        mission,
        whoImChoose,
      },
      { new: true }
    );

    return res.status(200).json({ about: updated });
  } else {
    // Yeni kayıt oluştur
    const about = await About.create({
      staticModal: [{ ...staticModal[0], staticImages: staticModalImages }],
      introduction: [{ ...introduction[0], imagesIntro: introductionImages }],
      chefs: [{ ...chefs[0], imagesChefs: chefImage }],
      mission,
      whoImChoose,
    });

    return res.status(201).json({ about });
  }
});

const aboutGet = catchAsyncError(async (req, res) => {
  const about = await About.findOne().lean();
  return res.status(200).json({ about });
});

export default { aboutCreate, aboutGet };
