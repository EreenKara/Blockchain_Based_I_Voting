import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Text, Avatar, IconButton} from 'react-native-paper';
import {Story} from '@entities/story.entity';
import {Post} from '@entities/post.entity';

//unsplash kullanılabilir

const SocialMediaScreen: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      candidateId: 1,
      image: 'https://via.placeholder.com/60',
      content: 'Bu bir hikaye içeriğidir.',
    },
    // Daha fazla hikaye eklenebilir
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      candidateId: 1,
      socialMediaId: 1,
      image: 'https://via.placeholder.com/400',
      content: 'Bu bir örnek post içeriğidir.',
      likes: 42,
      dislikes: 5,
    },
    // Daha fazla post eklenebilir
  ]);

  const renderStory = ({item}: {item: Story}) => (
    <View style={styles.storyContainer}>
      <Avatar.Image
        size={60}
        source={{uri: item.image}}
        style={styles.storyAvatar}
      />
      <Text style={styles.storyUsername}>{item.candidateId}</Text>
    </View>
  );

  const renderPost = ({item}: {item: Post}) => (
    <Card style={styles.postCard}>
      <Card.Title
        title={item.candidateId}
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
        <Text>{item.likes} beğeni</Text>
        <IconButton icon="comment-outline" onPress={() => {}} />
        <Text>{item.dislikes} yorum</Text>
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
