import { useAppContext } from "../../../../AppContext";

export class DeviceStorageService {
  public get = async (key: string): Promise<string> => localStorage.getItem(key);

  public set = async (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
  };

  public remove = async (key: string): Promise<void> => {
    localStorage.removeItem(key);
  };
}

export const useDeviceStorageService = () => useAppContext().services.deviceStorageService;
