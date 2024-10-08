import catchAsyncError from "../middleware/catch.middleware.js";
import Menu from "../models/menu.models.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";

const menuCreate = catchAsyncError(async (req, res) => {
  const { sectionOne, sectionTwo, sectionThree, sectionFour, sectionFive } =
    req.body;
  const menuFind = await Menu.findOne().lean();

  //sectionOne
  const sectionOneImages = await upload_file(
    sectionOne[0].images.url,
    "shopit/menu"
  );
  //sectionTwo
  const sectionTwoImages = await upload_file(
    sectionTwo[0].images.url,
    "shopit/menu"
  );
  //sectionThree
  const sectionThreeImages = await upload_file(
    sectionThree[0].images.url,
    "shopit/menu"
  );
  //sectionFive
  const sectionFiveImages = await upload_file(
    sectionFive[0].images.url,
    "shopit/menu"
  );

  if (menuFind) {
    await delete_file(sectionOneImages.public_id);
    await delete_file(sectionTwoImages.public_id);
    await delete_file(sectionThreeImages.public_id);
    await delete_file(sectionFiveImages.public_id);

    const updated = await Menu.findByIdAndUpdate(
      menuFind._id,
      {
        sectionFour,
        sectionOne: { ...sectionOne, images: sectionOneImages },
        sectionTwo: { ...sectionTwo, images: sectionTwoImages },
        sectionThree: { ...sectionThree, images: sectionThreeImages },
        sectionFive: { ...sectionFive, images: sectionFiveImages },
      },
      { new: true }
    );

    return res.status(200).json({ menu: updated });
  } else {
    const menu = await Menu.create({
      sectionFour,
      sectionOne: { ...sectionOne, images: sectionOneImages },
      sectionTwo: { ...sectionTwo, images: sectionTwoImages },
      sectionThree: { ...sectionThree, images: sectionThreeImages },
      sectionFive: { ...sectionFive, images: sectionFiveImages },
    });

    return res.status(201).json({ menu });
  }
});

export default { menuCreate };
