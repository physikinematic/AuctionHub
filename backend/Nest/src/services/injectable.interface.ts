export interface Injected {
  findById(
    id: string,
  ): Promise<{ success: boolean; message: string; data: any; pagination: any }>;
}
