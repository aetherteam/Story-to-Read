import React from "react";
import { Link } from "react-router-dom";
import GenreLink from "../prefabs/GenreLink";

export default function BookPreview(props) {
  let text =
    "Тот момент, когда заfffffff fffкончиaa aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaлось начало";

  let genres = [
    { id: 1, name: "Романтика" },
    { id: 2, name: "Драма" },
    { id: 3, name: "Приключения" },
    { id: 4, name: "Путешествия во времени" },
    { id: 5, name: "Приключения" },
    { id: 6, name: "Жопа" },
    { id: 6, name: "Жопа" },
  ];

  let description =
    "Ничего не желающий парень и девушка, возможно, способная на всё, встречаются в роковую ночь. Что ждёт молодого человека после встречи с этой таинственной девушкой в мире, где нет места живому общению. Ничего не желающий парень и девушка, возможно, способная на всё, встречаются в роковую ночь. Ничего не желающий парень и девушка, возможно, способная на всё, встречаются в роковуюа всё, встречаются в роковую ночь. Ничего не желающий парень и девушка, возможно, способная на всё, встречаются в роковую возможно, способная на всё, встречаются в роковую возможно, способная на всё, встречаются в роковую возможно, способная на всё, встречаются в роковую возможно, способная на всё, встречаются в роковую";

  return (
    <div className="book__preview__wrapper">
      <div className="book__preview__image__wrapper">
        <img
          src="./bookplaceholder.png"
          alt=""
          className="book__preview__image"
        />
      </div>
      <div className="book__preview__content">
        <div className="book__preview__content__info">
          <Link className="book__preview__title" title={text}>
            {text}
          </Link>
          <Link className="book__preview__author" title={text}>
            Author
          </Link>
          <div className="book__preview__content__genres">
            {genres.slice(0, 5).map((genre) => {
              console.log(genre);
              return <GenreLink genre={{ id: genre.id, name: genre.name }} />;
            })}

            {genres.length > 6 && <div className="genre_link">...</div>}
          </div>
          <div className="book__preview__content_description">
            {description.length < 700
              ? description
              : description.slice(0, 700) + "..."}
          </div>
        </div>
        <Link className="book__preview__content__button">Читать</Link>
      </div>
    </div>
  );
}
