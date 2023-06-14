import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SongPreview } from "./song-preview";
import { store } from "../store/store";
import { updateCurrentSong, updateCurrentStation } from "../store/station.actions";
import { stationService } from "../services/station.service.local";
import { useSelector } from "react-redux";

export function SongList({ station }) {
  const [songs, setSongs] = useState(station.songs);
  const stationFromStore = useSelector(
    (storeState) => storeState.stationModule.station
)
  

  async function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
  
    const updatedSongs = Array.from(stationFromStore.songs);
    const [removed] = updatedSongs.splice(result.source.index, 1);
    updatedSongs.splice(result.destination.index, 0, removed);
  
    const updatedSongsWithIndex = updatedSongs.map((song, index) => ({
      ...song,
      index: index + 1,
    }));
    station.songs = updatedSongsWithIndex
    station = await stationService.save(station)
    store.dispatch(updateCurrentStation(station))
    setSongs(updatedSongsWithIndex);
  }
  

  function renderSongPreview(song, idx) {
    return (
      <Draggable key={song.id} draggableId={song.id} index={idx}>
        {(provided) => (
          <tr
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="song-preview grid-colums"
            onClick={()=>store.dispatch(updateCurrentSong(song))}
          >
            <SongPreview song={song} idx={idx} />
          </tr>
        )}
      </Draggable>
    );
  }

  return (
    <div className="song-list">
      <table>
        <thead>
          <tr className="grid-colums">
            <td className="flex column">#</td>
            <td className="song-title flex">Title</td>
            {/* <td className="flex">Album</td> */}
            <td className="flex">Date added</td>
            <td className="flex icon align-center">
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                className="Svg-sc-ytk21e-0 ldgdZj"
              >
                <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
                <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
              </svg>
            </td>
          </tr>
          </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="songList">
            {(provided) => (
              <tbody
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="song-list"
              >
                {station.songs.map((song, idx) => renderSongPreview(song, idx))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </div>
  );
}