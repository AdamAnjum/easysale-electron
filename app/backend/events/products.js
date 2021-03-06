import { ipcMain } from 'electron';
import { getProducts, getProductsByName, saveProduct, getComboProducts, exportProducts, getExportProducts, bulkInsert } from '../services/product';
import authenticateUser from '../services/auth/authenticateUser'

ipcMain.handle('GET_PRODUCTS', async (event, data) => {
  const product = await getProducts(data);
  return product;
});

ipcMain.handle('GET_PRODUCTS_BY_NAME', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await getProductsByName({ user, ...rest });
});

ipcMain.handle('SAVE_PRODUCT', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await saveProduct({ user, ...rest });
});

ipcMain.handle('GET_COMBO_PRODUCTS', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await getComboProducts({ user, ...rest });
});

ipcMain.handle('GET_EXPORT_PRODUCTS', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await getExportProducts({ user, ...rest });
});

ipcMain.handle('BULK_INSERT_PRODUCTS_FOR_IMPORT_PRODUCTS', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await bulkInsert({ user, ...rest });
});

