//raw queries
exports.get_active_sessions = 
`
  SELECT 
    a.*,
    b.name AS session_name,
    b.id AS session_id,
    GROUP_CONCAT(c.name || ',' || c.photo, ';') player_list
  FROM  
    boards a 
    LEFT JOIN sessions b ON (b.id = a.current_session_id)
    LEFT JOIN players  c ON (c.session_id = b.id)
  GROUP BY 
    a.idno
  ORDER BY
    a.idno
`;

//LEFT JOIN killer_players d ON (d.player_id = c.id)

exports.get_board = 
`
  SELECT 
    a.*,
    b.name AS session_name,
    b.id AS session_id,
    GROUP_CONCAT(c.name || ',' || c.photo  || ',' || total_points, ';') player_list
  FROM  
    boards a 
    LEFT JOIN sessions b ON (b.id = a.current_session_id)
    LEFT JOIN players  c ON (c.session_id = b.id)
  WHERE
    a.id = :board_id
  GROUP BY 
    a.idno
  ORDER BY
    a.idno
`;

