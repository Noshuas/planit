export const exportAll = (imports, cb) => {
  imports.forEach((alias) => {
    Object.entries(alias).forEach(cb);
  });
}