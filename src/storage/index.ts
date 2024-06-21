class StorageController {
  constructor(
    private readonly storageKey: string,
    private readonly storage: Storage = localStorage
  ) {}

  get = () => {
    return this.storage.getItem(this.storageKey) ?? ''
  }

  set = (value: string) => {
    this.storage.setItem(this.storageKey, value)
  }
}

export const tokenStorage = new StorageController('@cosmobots-blog/token')
