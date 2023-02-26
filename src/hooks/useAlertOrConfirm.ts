type Params = {};

type Return = {
  alert: (message: string) => void;
  confirm: (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => void;
};

const useAlertOrConfirm = (params?: Params): Return => {
  const alert = (message: string) => {
    if (typeof window !== undefined) {
      window.alert(message);
    }
  };

  const confirm = (
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    if (typeof window !== undefined) {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel && onCancel();
      }
    }
  };

  return { alert, confirm };
};

export default useAlertOrConfirm;
