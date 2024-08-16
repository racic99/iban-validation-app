import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ScreenRouteProp = RouteProp<ParamListBase, string>;

export type ScreenNavigationProp = NativeStackNavigationProp<ParamListBase, string>;

export type ScreenNavigationProps = {
  route?: ScreenRouteProp;
  navigation?: ScreenNavigationProp;
};
