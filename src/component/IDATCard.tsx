import React from 'react';
import {Box} from './Box';

export interface IDATCardProps {
  children: React.ReactNode;
}

export const IDATCard: React.FC<IDATCardProps> = ({
  children,
}: IDATCardProps) => {
  return (
    <Box
      elevation={4}
      marginTop={'r'}
      shadowColor={'gray'}
      shadowOffset={{width: 0, height: 1}}
      shadowOpacity={0.3}
      shadowRadius={2}
      marginHorizontal={'r'}
      paddingVertical={'r'}
      paddingHorizontal={'r'}
      backgroundColor={'white'}
      borderRadius={10}>
      {children}
    </Box>
  );
};
