import InAppSpy from "inapp-spy";

type InAppInfo = {
  isInApp: boolean;
  appKey?: string;
  appName?: string;
};

const useInAppBrowser = (): InAppInfo => {
  const ua = navigator.userAgent ?? "";

  if (/KAKAOTALK/i.test(ua))
    return { isInApp: true, appKey: "kakaotalk", appName: "카카오톡" };

  if (/DaumApps/i.test(ua))
    return { isInApp: true, appKey: "daum", appName: "Daum" };

  const spy = InAppSpy({ ua });

  if (spy.isInApp)
    return { isInApp: true, appKey: spy.appKey, appName: spy.appName };

  return { isInApp: false };
};

export default useInAppBrowser;
