const WATCH_LIST = "watch_list";

export class Storage {
  add(id: string) {
    const items = localStorage.getItem(WATCH_LIST);
    if (items) {
      const newItems = items.split(",");
      if (!newItems.includes(id)) {
        newItems.push(id);
        localStorage.setItem(WATCH_LIST, newItems.join(","));
      }
    } else {
      localStorage.setItem(WATCH_LIST, id);
    }
  }

  delete(id: string) {
    const items = localStorage.getItem(WATCH_LIST);
    if (items) {
      const newItems = items.split(",").filter((item) => item !== id);
      localStorage.setItem(WATCH_LIST, newItems.join(","));
    }
  }

  has(id: string) {
    const items = localStorage.getItem(WATCH_LIST);
    if (items) {
      const newItems = items.split(",");
      return newItems.includes(id);
    }
  }
}
