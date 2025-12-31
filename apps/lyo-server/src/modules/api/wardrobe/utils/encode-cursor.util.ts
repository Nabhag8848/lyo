const encodeCursor = (createdAt: Date, id: string): string => {
  return Buffer.from(`${createdAt.getTime()}|${id}`).toString('base64');
};

export default encodeCursor;
