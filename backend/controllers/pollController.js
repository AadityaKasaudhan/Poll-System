exports.createPoll = async (req, res) => {
    const { title, options, createdBy } = req.body;
    try {
      const connection = await connectToDatabase();
      await connection.execute('INSERT INTO polls (title, options, createdBy) VALUES (?, ?, ?)', [title, JSON.stringify(options), createdBy]);
      res.status(201).json({ message: 'Poll created successfully' });
      await connection.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.getPolls = async (req, res) => {
    try {
      const connection = await connectToDatabase();
      const [results] = await connection.execute('SELECT * FROM polls');
      res.status(200).json(results);
      await connection.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.votePoll = async (req, res) => {
    const { pollId, option } = req.body;
    try {
      const connection = await connectToDatabase();
      const [poll] = await connection.execute('SELECT options FROM polls WHERE id = ?', [pollId]);
      const options = JSON.parse(poll[0].options);
      options[option] += 1;
      await connection.execute('UPDATE polls SET options = ? WHERE id = ?', [JSON.stringify(options), pollId]);
      res.status(200).json({ message: 'Vote registered successfully' });
      await connection.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  