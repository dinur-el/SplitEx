import { createContext, useState } from 'react';

export const ParticipantContext = createContext({
    participants: null,
    addParticipants: (participants) => { },
})

function ParticipantContextProvider({ children }) {
    const [participants, setParticipants] = useState([]);

    function addParticipants(participants) {
        setParticipants(participants);
    }

    const value = {
        participants: participants,
        addParticipants: addParticipants
    }

    return <ParticipantContext.Provider value={value}>
        {children}
    </ParticipantContext.Provider>
}

export default ParticipantContextProvider; 