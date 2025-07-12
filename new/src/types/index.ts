export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  points: number;
};

export type ItemCategory = 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Shoes' | 'Accessories';
export type ItemCondition = 'New' | 'Like New' | 'Good' | 'Fair';

export type Item = {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: ItemCategory;
  size: string;
  condition: ItemCondition;
  tags: string[];
  points: number;
  status: 'Available' | 'Swapped' | 'Pending';
  userId: string;
  user?: User;
};
