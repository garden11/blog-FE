type Params = {};

type Return = {
  alert: (message: string) => void;
  confirm: (message: string) => boolean;
};

const useAlertOrConfirm = (params?: Params): Return => {
  const alert = (message: string) => {
    if (typeof window !== undefined) {
      window.alert(message);
    }
  };

  const confirm = (message: string) => {
    if (typeof window !== undefined) {
      if (window.confirm(message)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return { alert, confirm };
};

export default useAlertOrConfirm;
