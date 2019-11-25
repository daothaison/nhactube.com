import React, { useMemo, useEffect, useCallback } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Image, Icon, Button } from '../components/core';
import SongBar from '../containers/SongBar';
import { useGlobalPlayer } from '../hooks';
import { _take } from '../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const Handler = styled.div``;

const Avatar = styled(Image)``;

const List = styled.ul`
  max-height: 70rem;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent; 
  }

  &::-webkit-scrollbar-thumb,
  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, rgba(141, 141, 141, 0.35), rgba(141, 141, 141, 0.5), rgba(141, 141, 141, 0.35));
    border-radius: 999px;
  }
`;

const BasicPlaylist = ({ className, songs, id, name, avatarUrl }) => {
  const { playPlaylist } = useGlobalPlayer();

  const first15Music = useMemo(() => _take(songs, 15), [songs]);
  const handlePlayPlaylist = useCallback(() => {
    playPlaylist({
      id,
      name,
      avatarUrl,
      songs: first15Music,
    });
  }, [playPlaylist, first15Music, id, name]);

  return (
    <Wrapper className={className}>
      <Handler className="w-1/3">
        <Avatar src={avatarUrl} />
        <Button className="my-2" onClick={handlePlayPlaylist}>
          <Icon name="play" size="sm" className="mr-2" />
          Phát tất cả
        </Button>
      </Handler>
      <List className="w-2/3 ml-2">
        {first15Music.map((song, idx) => (
          <li key={idx}>
            <SongBar {...song} />
          </li>
        ))}
      </List>
    </Wrapper>
  )
};

export default BasicPlaylist;