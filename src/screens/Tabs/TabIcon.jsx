import HomeFocused from '../../assets/icons/home_focused.png';
import SearchFocused from '../../assets/icons/search_focused.png';
import LibraryFocused from '../../assets/icons/library_focused.png';

import Home from '../../assets/icons/home.png';
import Search from '../../assets/icons/search.png';
import Library from '../../assets/icons/library.png';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '../../components/ui/CustomText';
import {Colors, Fonts} from '../../utils/Constants';
import {fontR} from '../../utils/Scaling';

const TabIcon = ({name}) => {
  return (
    <View style={[styles.tabStyles]}>
      <Image
        source={name === 'Home' ? Home : name === 'Search' ? Search : Library}
        style={[styles.icon]}
      />
      <CustomText style={styles.textStyleInActive}>{name}</CustomText>
    </View>
  );
};

const TabIconFocused = ({name}) => {
  return (
    <View style={[styles.tabStyles]}>
      <Image
        source={
          name === 'Home'
            ? HomeFocused
            : name === 'Search'
            ? SearchFocused
            : LibraryFocused
        }
        style={[styles.icon]}
      />
      <CustomText fontFamily={Fonts.Bold} style={styles.textStyleActive}>
        {name}
      </CustomText>
    </View>
  );
};

export const HomeTabIcon = ({focused}) => {
  return focused ? <TabIconFocused name="Home" /> : <TabIcon name="Home" />;
};

export const SearchTabIcon = ({focused}) => {
  return focused ? <TabIconFocused name="Search" /> : <TabIcon name="Search" />;
};
export const LibraryTabIcon = ({focused}) => {
  return focused ? (
    <TabIconFocused name="Library" />
  ) : (
    <TabIcon name="Library" />
  );
};

const styles = StyleSheet.create({
  tabStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RFValue(50),
  },
  icon: {
    width: RFValue(18),
    height: RFValue(18),
  },
  textStyleActive: {
    marginTop: 4,
    fontSize: fontR(9.5),
    textAlign: 'center',
  },
  textStyleInActive: {
    marginTop: 4,
    fontSize: fontR(9.5),
    textAlign: 'center',
    color: Colors.inactive,
  },
});
