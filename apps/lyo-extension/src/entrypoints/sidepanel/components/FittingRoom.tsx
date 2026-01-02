import { useActiveTabProductStore } from '@/entrypoints/sidepanel/stores';

export const FittingRoom = () => {
  const activeTabProduct = useActiveTabProductStore();

  // have a button which changes price to 100
  const handleChangePrice = () => {
    useActiveTabProductStore.setState({
      ...activeTabProduct,
      price: '100',
    });
  };

  return (
    <div>
      <pre>{JSON.stringify(activeTabProduct, null, 2)}</pre>
      <button onClick={handleChangePrice}>Change Price</button>
    </div>
  );
};
