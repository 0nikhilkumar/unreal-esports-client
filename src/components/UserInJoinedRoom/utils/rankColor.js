export const getRankColor = (rank) => {
  switch (rank) {
    case 1:
      return 'text-yellow-400'; // Gold for rank 1
    case 2:
      return 'text-gray-300'; // Silver for rank 2
    case 3:
      return 'text-amber-600'; // Bronze for rank 3
    default:
      return 'text-gray-500'
      // Generate a random color for ranks beyond 3
      // const randomColors = [
      //   'text-red-500',
      //   'text-blue-500',
      //   'text-green-500',
      //   'text-purple-500',
      //   'text-pink-500',
      //   'text-orange-500',
      //   'text-teal-500',
      // ];
      // return randomColors[Math.floor(Math.random() * randomColors.length)];
  }
};