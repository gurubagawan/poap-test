export const PoapDisplay = ({ poaps }) => (<div className="poap-container">
  <h3>User's POAP Collection</h3>
  <div className="d-flex row">
    {poaps.map((poap) => (
      <div key={poap.id} className="col-12 col-sm-4 col-lg-2 poap-details">
        <a href={`https://poap.gallery/drop/${poap.event.id}`} target="_blank" rel="noopener noreferrer">
          <img src={`${poap.event.image_url}?size=small`} alt={poap.id} className="poap-image" />
        </a>
        <div className="margin-ten">
          <b>
            {poap.event.name}
          </b>

          <p className="margin-ten">
            Id:&nbsp;
            <b>
              {poap.tokenId}
            </b>
          </p>
          <p>
            Drop ID:&nbsp;
            <b>{poap.event.id}</b>
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
)