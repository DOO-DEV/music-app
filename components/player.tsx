import {
  Box,
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useState, useRef } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formaters";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(
    songs.findIndex((song) => song.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const changeActiveSong = useStoreActions(
    (store: any) => store.changeActiveSong
  );
  const repeatRef = useRef(repeat);

  useEffect(() => {
    let timerID;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerID = requestAnimationFrame(f);
      };

      timerID = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerID);
    }
    cancelAnimationFrame(timerID);
  }, [playing, isSeeking]);

  useEffect(() => {
    changeActiveSong(songs[index]);
  }, [index, changeActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((shuffle) => !shuffle);
  };

  const onRepeat = () => {
    setRepeat((repeat) => !repeat);
  };

  const prevSong = () => {
    setIndex((index) => {
      return index ? index - 1 : songs.lenght - 1;
    });
  };

  const nextSong = () => {
    setIndex((index) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === index) {
          return nextSong();
        }
        return next;
      }
      return songs.length - 1 === index ? 0 : index + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            aria-label="shuffle"
            fontSize="24px"
            outline="none"
            variant="link"
            icon={<MdShuffle />}
            color={shuffle ? "white" : "gray.600"}
            onClick={onShuffle}
          />
          <IconButton
            aria-label="previos"
            fontSize="24px"
            outline="none"
            variant="link"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {!playing ? (
            <IconButton
              aria-label="play"
              fontSize="40px"
              outline="none"
              variant="link"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          ) : (
            <IconButton
              aria-label="pause"
              fontSize="40px"
              outline="none"
              variant="link"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          )}

          <IconButton
            aria-label="next"
            fontSize="24px"
            outline="none"
            variant="link"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            aria-label="repeat"
            fontSize="24px"
            outline="none"
            variant="link"
            icon={<MdOutlineRepeat />}
            color={repeat ? "white" : "gray.600"}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%" fontSize="x-small">
            <Text>{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              id="player-range"
              max={duration ? Number(duration.toFixed(2)) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" fontSize="x-small" textAlign="right">
            <Text>{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
