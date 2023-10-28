import {
  IconDefinition,
  faBaby,
  faBabyCarriage,
  faBell,
  faCandyCane,
  faCookieBite,
  faGift,
  faGifts,
  faHeart,
  faHeartCircleBolt,
  faHollyBerry,
  faIgloo,
  faMitten,
  faMugHot,
  faSleigh,
  faSnowflake,
  faSnowman,
  faSnowplow,
  faStar,
  faStarHalfAlt,
  faTree,
} from "@fortawesome/free-solid-svg-icons";

// list of all font awesome icons relating to christmas, winter, love, etc.
const christmasIcons = [
  faSnowflake,
  faMitten,
  faStar,
  faCookieBite,
  faHollyBerry,
  faCandyCane,
  faBell,
  faGift,
  faIgloo,
  faSleigh,
  faTree,
  faMugHot,
  faStarHalfAlt,
  faGifts,
  faBaby,
  faSnowman,
  faBabyCarriage,
];

export function getIconForDay(day: number): IconDefinition {
  if (day == 24) {
    return faHeart;
  }

  return christmasIcons[(day - 1) % christmasIcons.length];
}
