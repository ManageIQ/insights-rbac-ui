export const BAD_UUID = 'bad uuid';

import debouncePromise from '@redhat-cloud-services/frontend-components-utilities/debounce';

export const scrollToTop = () =>
  document.getElementById('root').scrollTo({
    behavior: 'smooth',
    top: 0,
    left: 0,
  });

export const getCurrentPage = (limit = 1, offset = 0) => Math.floor(offset / limit) + 1;

export const getNewPage = (page = 1, offset) => (page - 1) * offset;

export const mappedProps = (apiProps) =>
  Object.entries(apiProps).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...(value && { [key]: value }),
    }),
    {}
  );

export const debouncedFetch = debouncePromise((callback) => callback());

export const calculateChecked = (rows = [], selected) => {
  const nonDefaults = rows.filter((row) => !row.platform_default);
  return (
    (nonDefaults.length !== 0 && nonDefaults.every(({ uuid }) => selected.find((row) => row.uuid === uuid))) || (selected.length > 0 ? null : false)
  );
};

export const selectedRows = (newSelection, isSelected) => (selected) => {
  if (!isSelected) {
    return selected.filter((row) => !newSelection.find(({ uuid }) => uuid === row.uuid));
  }

  return [...selected, ...newSelection].filter((row, key, arr) => arr.findIndex(({ uuid }) => row.uuid === uuid) === key);
};

export const firstUpperCase = (text) => text.charAt(0).toUpperCase() + text.slice(1);
