export const exportAll = (imports, cb) => {
  imports.forEach((alias) => {
    (typeof alias === 'object')
      ? Object.entries(alias).forEach(cb)
      : cb([alias.name, alias]);
  });
}