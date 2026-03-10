// Utils
import L from "leaflet";
import { Marker as LeafletMarker, MarkerProps } from "react-leaflet";
import { ReactNode } from "react";

// Icon definitions
const markerIcon = L.icon({
  iconUrl: "/images/marker.png",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const markerActiveIcon = L.icon({
  iconUrl: "/images/marker-active.png",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface CustomMarkerProps extends Omit<MarkerProps, "icon"> {
  active?: boolean;
  children?: ReactNode;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onClick?: () => void;
}

function Marker({
  active,
  children,
  onMouseOver,
  onMouseOut,
  onClick,
  eventHandlers,
  ...props
}: CustomMarkerProps) {
  const icon = active ? markerActiveIcon : markerIcon;

  const combinedEventHandlers = {
    ...eventHandlers,
    ...(onMouseOver && { mouseover: onMouseOver }),
    ...(onMouseOut && { mouseout: onMouseOut }),
    ...(onClick && { click: onClick }),
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LeafletMarker {...props} icon={icon} eventHandlers={combinedEventHandlers}>
      {children}
    </LeafletMarker>
  );
}

Marker.defaultProps = {
  active: false,
  children: undefined,
  onMouseOver: undefined,
  onMouseOut: undefined,
  onClick: undefined,
};

export default Marker;
