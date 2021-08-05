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

const institutions = require("../assets/icons/hotel.png");
const suppliers = require("../assets/icons/communication.png");
const guides = require("../assets/icons/stationery.png");
const update = require("../assets/icons/gear.png");
const terms = require("../assets/icons/computer.png");
const feedback = require("../assets/icons/advertising.png");
const publications = require("../assets/icons/knowledge.png");
const more = require("../assets/icons/wholesale.png");

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
  { 'id': 0, 'icon': icon_medicines, 'title': 'Medicines', 'description': 'Monographs for prescription and OTC medicine, herbals, and supplements', 'navigateTo': 'MedicineCategories', 'type': 'page' },
  { 'id': 1, 'icon': icon_infections, 'title': 'Diseases and Conditions', 'description': 'Comprehensively answer clinical questions on diseases and conditions', 'navigateTo': 'DiseaseConditions', 'type': 'page' },
  { 'id': 2, 'icon': icon_settings, 'title': 'Tools and Resources', 'description': 'Tools and guides to help with measurements, calculations and standards', 'navigateTo': 'Resources', 'type': 'page' },
  { 'id': 3, 'icon': icon_resources, 'title': 'Smart Search', 'description': 'Quickly dig through thousands of medicine, disease and condition information', 'navigateTo': 'GlobalSearch', 'type': 'page' }
];

const MainMenuRefence = [
  { 'id': 0, 'icon': icon_medicines, 'title': 'Medicines', 'description': 'Access monographs for prescription and over-the-counter medicine, as well as for corresponding brand-name medicine, herbals, and supplements...', 'navigateTo': 'MedicineCategoriesBigScreen', 'type': 'page' },
  { 'id': 1, 'icon': icon_infections, 'title': 'Diseases and Conditions', 'description': 'Disease and condition articles are organized to rapidly and comprehensively answer clinical questions and to provide in-depth information...', 'navigateTo': 'DiseaseConditions', 'type': 'page' },
  { 'id': 2, 'icon': icon_resources, 'title': 'Smart Search', 'description': 'Quickly dig through thousands of our medicine, disease and condition information using the EDLIZ Smart Search', 'navigateTo': 'GlobalSearch', 'type': 'page' },
  { 'id': 3, 'icon': publications, 'title': 'Publications', 'description': 'Library of publications, articles, research and additional resources.', 'navigateTo': 'Publications', 'type': 'page' }
];

const MainMenuTools = [
  { 'id': 0, 'icon': guides, 'title': 'Guides and Calculators', 'description': 'Tools and guides to help with measurements, calculations and standards', 'navigateTo': 'GuidesCalculators', 'type': 'page' },
  { 'id': 1, 'icon': institutions, 'title': 'Institutions', 'description': 'Directory of approved suppliers', 'navigateTo': 'Institutions', 'type': 'page' },
  { 'id': 2, 'icon': suppliers, 'title': 'Approved Suppliers', 'description': 'Directory of approved suppliers', 'navigateTo': 'Suppliers', 'type': 'page' },
  { 'id': 3, 'icon': more, 'title': 'More', 'description': 'View more options', 'navigateTo': 'Resources', 'type': 'page' },
];

const MainMenuSupport = [
  { 'id': 0, 'icon': feedback, 'title': 'Reporting an Adverse Medicine Reaction', 'description': 'Use this tool to submit a report an Adverse Drug Reaction', 'navigateTo': 'https://e-pv.mcaz.co.zw/', 'type': 'url' },
  { 'id': 1, 'icon': update, 'title': 'Check for Updates', 'description': 'Update your data to the latest version from the updated EDLIZ digial files', 'navigateTo': 'Update', 'type': 'page' },
  { 'id': 2, 'icon': terms, 'title': 'Terms and Conditions', 'description': 'View our Terms and Conditions of Service', 'navigateTo': 'https://www.padendere.co.zw/edliz/support.php', 'type': 'url' },
  { 'id': 3, 'icon': feedback, 'title': 'Send us Feedback', 'description': 'Have any queries, comments, suggestions or questions?', 'navigateTo': 'https://www.padendere.co.zw/edliz/support.php', 'type': 'url' }
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
  icon_resources,
  MainMenuRefence,
  MainMenuTools,
  MainMenuSupport
};