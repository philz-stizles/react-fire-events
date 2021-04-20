import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Label } from "semantic-ui-react";

const EventDetailSidebar = ({ attendees, hostUid }) => {
    const count = attendees.length;

    return (
        <>
            <Segment
                textAlign="center"
                style={{ border: "none" }}
                attached="top"
                secondary
                inverted
                color="teal"
            >{(count > 0 ) ? (count === 1) ? 'One Person is going' : `${count} People are going` : 'No attendees yet'}</Segment>
            <Segment attached>
                <Item.Group relaxed divided>
                    {
                        attendees.map(({ id, displayName, photoURL}) => {
                            return (
                                <Item key={id} as={Link} to={`/profile/${id}`} style={{ position: "relative" }}>
                                    {(hostUid === id) && (
                                        <Label style={{ position: "absolute" }} color="orange" ribbon="right"content="Host" />
                                    )}
                                    <Item.Image size="tiny" src={photoURL} />
                                    <Item.Content verticalAlign="middle">
                                    <Item.Header as="h3">
                                        <span>{displayName}</span>
                                    </Item.Header>
                                    </Item.Content>
                                </Item>
                            )
                        })
                    }
                </Item.Group>
            </Segment>
        </>
    );
};

export default EventDetailSidebar;
