export const Banner = ({ image = "/images/banner.jpg", alt = "sale" }) => {
  return (
    <section className="banner">
      <div className="container">
        <div className="columns is-centered">
          <img src={image} alt={alt} />
        </div>
      </div>
    </section>
  );
};
