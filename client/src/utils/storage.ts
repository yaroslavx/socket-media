const storage = {
  get: (key: string) =>
    window.localStorage.get(key)
      ? JSON.parse(window.localStorage.get(key))
      : null,

  set: (key: string, value: any) =>
    window.localStorage.setItem(key, JSON.stringify(value)),
};

export default storage;
