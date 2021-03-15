// local imgs
const Onboarding = require("../assets/imgs/purple_medicine.jpg");
const Logo = require("../assets/imgs/argon-logo.png");
const LogoOnboarding = require("../assets/imgs/argon-logo-onboarding.png");
const ProfileBackground = require("../assets/imgs/purple_medicine.jpg");
const RegisterBackground = require("../assets/imgs/register-bg.png");
const Pro = require("../assets/imgs/getPro-bg.png");
const ArgonLogo = require("../assets/imgs/argonlogo.png");
const iOSLogo = require("../assets/imgs/ios.png");
const androidLogo = require("../assets/imgs/android.png");
const MoHCCCoatOfArms = require("../assets/imgs/mohcc.png");
const ProfilePicture = require("../assets/imgs/mohcc.png");

const icon_medicines = require("../assets/icons/medicine.png");
const icon_infections = require("../assets/icons/infection.png");
const icon_resources = require("../assets/icons/algorithm.png");
const icon_settings = require("../assets/icons/automation.png");

// internet imgs
const Viewed = [
  'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1551798507-629020c81463?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=240&q=80',
  MoHCCCoatOfArms,

];

//menu 
const MainMenu = [
  { 'icon': icon_medicines, 'title': 'Medicines', 'description': '', 'navigateTo': 'MedicineCategories' },
  { 'icon': icon_infections, 'title': 'Diseases and Conditions', 'description': '', 'navigateTo': 'DiseaseConditions' },
  { 'icon': icon_settings, 'title': 'Tools and Resources', 'description': '', 'navigateTo': 'Resources' },
  { 'icon': icon_resources, 'title': 'Smart Search', 'description': '', 'navigateTo': 'GlobalSearch' }
];

const Products = {
  'View article': 'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=840&q=840',
};

export default {
  Onboarding,
  Logo,
  LogoOnboarding,
  ProfileBackground,
  ProfilePicture,
  RegisterBackground,
  Viewed,
  Products,
  Pro,
  ArgonLogo,
  iOSLogo,
  androidLogo,
  MoHCCCoatOfArms,
  MainMenu,
};