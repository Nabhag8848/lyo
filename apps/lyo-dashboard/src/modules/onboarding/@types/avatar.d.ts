declare interface Avatar {
  id: string;
  url?: string;
}

declare interface AvatarSelectorProps {
  avatars: Avatar[];
  selectedAvatarId?: string;
  onSelectAvatar: (avatarId: string) => void;
  isLoading?: boolean;
}
