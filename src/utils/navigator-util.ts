import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";

const navigationRef = createNavigationContainerRef();

const navigate = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params));
  }
};

export default {
  navigationRef,
  navigate,
};