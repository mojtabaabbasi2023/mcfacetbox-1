/**
 * این کامپوزیبل برای پیتشبانی از رصد تغییرات اتصال فیش به نود استفاده میشود
 * اگر فیش جدیدی به نود یا به درخت متصل شود مقدار تغییر میکند
 */
export const useDataShelfStateChanged = createGlobalState(
  () => {
    const lastState = ref(false)
    const connectednodeid = ref(0)

    return { lastState, connectednodeid }
  },
)
