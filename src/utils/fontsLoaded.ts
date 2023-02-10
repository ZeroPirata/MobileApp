import {
  DMSerifDisplay_400Regular,
  DMSerifDisplay_400Regular_Italic,
} from "@expo-google-fonts/dm-serif-display";
import { BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { PrincessSofia_400Regular } from "@expo-google-fonts/princess-sofia";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light_Italic,
  Poppins_400Regular_Italic,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import {
  PTSansNarrow_400Regular,
  PTSansNarrow_700Bold,
} from "@expo-google-fonts/pt-sans-narrow";
import {
  SignikaNegative_300Light,
  SignikaNegative_400Regular,
  SignikaNegative_500Medium,
  SignikaNegative_600SemiBold,
  SignikaNegative_700Bold,
} from "@expo-google-fonts/signika-negative";
import {
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from "@expo-google-fonts/dm-sans";

export default {
  FontsLoadedFunction() {
    const [fontsLoaded] = useFonts({
      DMSans_400Regular_Italic,
      DMSans_500Medium,
      DMSans_500Medium_Italic,
      DMSans_700Bold,
      DMSans_700Bold_Italic,
      SignikaNegative_300Light,
      SignikaNegative_400Regular,
      SignikaNegative_500Medium,
      SignikaNegative_600SemiBold,
      SignikaNegative_700Bold,
      BebasNeue_400Regular,
      PrincessSofia_400Regular,
      PTSansNarrow_400Regular,
      PTSansNarrow_700Bold,
      Poppins_300Light,
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_700Bold,
      Poppins_800ExtraBold,
      DMSans_400Regular,
      DMSerifDisplay_400Regular,
      DMSerifDisplay_400Regular_Italic,
      Poppins_100Thin,
      Poppins_100Thin_Italic,
      Poppins_200ExtraLight,
      Poppins_200ExtraLight_Italic,
      Poppins_300Light_Italic,
      Poppins_400Regular_Italic,
      Poppins_500Medium_Italic,
      Poppins_600SemiBold,
      Poppins_600SemiBold_Italic,
      Poppins_700Bold_Italic,
      Poppins_800ExtraBold_Italic,
      Poppins_900Black,
      Poppins_900Black_Italic,
    });
    return fontsLoaded;
  },
};
