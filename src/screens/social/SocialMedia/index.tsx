import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Text, Avatar, IconButton} from 'react-native-paper';
import {Story} from '@entities/story.entity';
import {Post} from '@entities/post.entity';
import {Candidate} from '@entities/candidate.entity';

//unsplash kullanılabilir

const SocialMediaScreen: React.FC = () => {
  const demoCandidate = new Candidate(
    '1',
    'John Doe',
    'Bu bir açıklama',
    'https://via.placeholder.com/60',
    '#000000',
    1,
  );

  const [stories, setStories] = useState<Story[]>([
    new Story(
      '1',
      'https://via.placeholder.com/60',
      'Bu bir hikaye içeriğidir.',
      demoCandidate,
    ),
  ]);

  const [posts, setPosts] = useState<Post[]>([
    new Post(
      '1',
      'https://via.placeholder.com/400',
      'Bu bir örnek post içeriğidir.',
      demoCandidate,
    ),
  ]);

  const renderStory = ({item}: {item: Story}) => (
    <View style={styles.storyContainer}>
      <Avatar.Image
        size={60}
        source={{uri: item.image}}
        style={styles.storyAvatar}
      />
      <Text style={styles.storyUsername}>
        {item.candidate?.name || 'İsimsiz'}
      </Text>
    </View>
  );

  const renderPost = ({item}: {item: Post}) => (
    <Card style={styles.postCard}>
      <Card.Title
        title={item.candidate?.name || 'İsimsiz'}
        left={props => (
          <Avatar.Image {...props} size={40} source={{uri: item.image}} />
        )}
      />
      <Card.Content>
        <Text>{item.content}</Text>
      </Card.Content>
      <Card.Cover source={{uri: item.image}} />
      <Card.Actions>
        <IconButton icon="heart-outline" onPress={() => {}} />
        <Text>{item.likes?.length || 0} beğeni</Text>
        <IconButton icon="comment-outline" onPress={() => {}} />
        <Text>{item.comments?.length || 0} yorum</Text>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <FlatList
              data={stories}
              renderItem={renderStory}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.storiesList}
            />
          </View>
        }
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storiesList: {
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  storyAvatar: {
    borderWidth: 2,
    borderColor: '#e91e63',
  },
  storyUsername: {
    fontSize: 12,
    marginTop: 4,
  },
  postCard: {
    marginVertical: 8,
  },
});

export default SocialMediaScreen;
