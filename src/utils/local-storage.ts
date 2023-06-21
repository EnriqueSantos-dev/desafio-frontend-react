export function getItemLocalStorage<
  TKey extends string,
  TReturn extends unknown
>(key: TKey): TReturn {
  const item = localStorage.getItem(key);
  return item as TReturn;
}

export function setItemInLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}
