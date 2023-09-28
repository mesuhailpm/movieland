export default function Card({ movie }) {
  const { Poster, Type, Title } = movie;

  return (
    <div className="card">
      <img src={Poster} alt="" />
      <div className="movie-info">
        <p>{Type.toUpperCase()}</p>
        <h3>{Title}</h3>
      </div>
    </div>
  );
}
