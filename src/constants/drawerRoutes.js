import ScreensNameEnum from './ScreensNameEnum';
const drawerRoutes = [
  {
    title: 'My Jobs',
    screen: ScreensNameEnum.ALL_JOBS_SCREEN,
    icon: 'clipboard-text-outline',
    loginType: 'delivery',
    color: '#E3AB1A',
  },
  {
    title: 'Messages',
    screen: ScreensNameEnum.CHAT_SCREEN,
    icon: 'message-processing',
    loginType: 'customer',
    color: '#118CFE',
  },
  {
    title: 'Payments',
    screen: ScreensNameEnum.PAYMENT_SCREEN,
    icon: 'credit-card',
    loginType: 'customer',
    color: '#2ECC71',
  },
  {
    title: 'Help',
    screen: ScreensNameEnum.HELP_SCREEN,
    icon: 'help-circle',
    loginType: 'customer',
    color: '#E3AB1A',
  },
  {
    title: 'Settings',
    screen: ScreensNameEnum.SETTINGS_SCREEN,
    icon: 'cog-outline',
    loginType: 'customer',
    color: '#1730B1',
  },
];

export default drawerRoutes;
