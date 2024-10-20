import imgHero from "/hero/hero.png";
import { useLocation } from "react-router-dom";
import { cn } from "../../utils/TailwindMerge";
import PropTypes from "prop-types";
const Hero = ({
  title,
  titleClass,
  subTitleClass,
  subTitle,
  titleMainClass,
  classNameHero,
}) => {
  const pathname = useLocation().pathname;
  return (
    <section className={cn("bg-hero", classNameHero)}>
      <div className="flex items-center justify-center h-full w-full lg:flex-row flex-col">
        <div
          className={cn(
            "flex-[2] flex flex-col items-start gap-4 justify-center py-4 px-7",
            titleMainClass
          )}
        >
          <h1
            className={cn(" font-[800] leading-[77px] text-white", titleClass)}
          >
            {title}
          </h1>
          <p
            className={cn(
              "text-[16px] leading-[24px] text-white  text-center",
              subTitleClass
            )}
          >
            {subTitle}
          </p>
          {pathname === "/" && (
            <button className="py-3 px-4 rounded-md bg-[#FEA116] text-white hover:bg-[#c47f17] transition-all duration-300">
              Şimdi Rezervasyon Yap
            </button>
          )}
        </div>
        {pathname === "/" && (
          <div className="flex-1 w-full lg:pb-0 pb-12 items-center justify-center flex hero-active">
            <img
              src={imgHero}
              alt=""
              className="xl:w-[400px] xl:h-[400px] sm:w-[350px] sm:h-[350px]  w-[250px]   animate-spin "
            />
          </div>
        )}
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string,
  subTitleClass: PropTypes.string,
  subTitle: PropTypes.string,
  titleClass: PropTypes.string,
  titleMainClass: PropTypes.string,
  className: PropTypes.string,
  classNameHero: PropTypes.string,
};

export default Hero;
