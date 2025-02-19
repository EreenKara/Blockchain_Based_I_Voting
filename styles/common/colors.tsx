import {Appearance, ColorSchemeName} from 'react-native';

interface ColorsSchema {
  button: string;
  background: string;
  cardButton: string;
  cardBackground: string;
  transition: string;
  text: string;
  cardText: string;
  disabled: string;
  transparentColor: string;
  error: string;
  borderColor: string;
  indicator: string;
  icon: string;
}
const light: ColorsSchema = {
  button: '#056161', // tiklanabilir ögeler ve focused olan ögelerin renkleri
  background: '#E0F7FA', // background renkleri
  cardButton: '#15324E', // kart buton renkleri ve arka plandan ayrılan ögelerin button renkleri
  cardBackground: '#334C64', // kart arka planları ve arka plandan ayrılan ögelerin renkleri
  transition: '#CBF2F6', // background ile aynı olsun istemiyorsun ama ona yakın bir renk olsun istiyorsun.
  cardText: '#BFCCCE', // kart içerisindeki text renkleri
  text: '#000', // text renkleri
  disabled: '#193333', // herhangi bir tıklanabilir öge disabled oldugunda renkleri
  transparentColor: 'rgba(0,0,0,0.3)', // arka plan'ın blurlaşmasının rengi

  error: 'red', // hata renkleri
  borderColor: '#056161',
  indicator: '#0a7ea4', // herhangi tutmaç, garip button gibi etkileşime girilebilen öğenin içerisindeki kısım. Switch'in kafası örneğin.
  icon: '#687076',
};

const dark: ColorsSchema = {
  button: '#022727',
  background: '#167F8D',
  cardButton: '#3E2541',
  cardBackground: '#704375',
  transition: '#0E5058',
  text: '#fff',
  cardText: '#E0EAEB',
  disabled: '#A3D8D8',
  transparentColor: 'rgba(255,255,255,0.4)',

  error: 'red',
  borderColor: '#fff',
  indicator: '#0a7ea4',
  icon: '#9BA1A6',
};

const Colors = {
  light: light,
  dark: dark,

  // Otomatik tema seçimi
  getTheme: (colorScheme?: ColorSchemeName) => {
    // Eğer colorScheme belirtilmemişse, cihazın mevcut temasını al
    const theme = colorScheme || Appearance.getColorScheme();
    // Tema seçimi
    switch (theme) {
      case 'dark':
        return dark;
      case 'light':
      default:
        return light;
    }
  },

  getThemeName: () => {
    // theme'lar color'dan farklı bir mantık ama burdan çekmek istedim.
    const theme = 'primary';
    return theme;
  },
};

export default Colors;
