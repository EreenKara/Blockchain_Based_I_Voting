import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Text, Avatar, IconButton} from 'react-native-paper';
import {Story} from '@entities/story.entity';
import {Post} from '@entities/post.entity';
import {Candidate} from '@entities/candidate.entity';
import {SocialMedia} from '@entities/social.media.entity';
import {User} from '@entities/user.entity';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';

//unsplash kullanılabilir

const SocialMediaScreen: React.FC = () => {
  const demoCandidate = new Candidate({
    id: '1',
    name: 'John Doe',
    description: 'Bu bir açıklama',
    image: '',
    color: '#000000',
  });

  const [stories, setStories] = useState<Story[]>([
    new Story({
      id: '1',
      image: '',
      content: '1Bu bir hikaye içeriğidir.',
      candidate: demoCandidate,
    }),
    new Story({
      id: '2',
      image: '',
      content: '2Bu bir hikaye içeriğidir.',
      candidate: demoCandidate,
    }),
  ]);

  const [posts, setPosts] = useState<Post[]>([
    new Post({
      id: '1',
      image: '',
      content: '',
      socialMedia: new SocialMedia({id: '1'}),
      candidate: demoCandidate,
    }),
    new Post({
      id: '2',
      image: '',
      content: '',
      socialMedia: new SocialMedia({id: '2'}),
      candidate: demoCandidate,
    }),
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
    <View style={styles.postContainer}>
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
    </View>
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
    backgroundColor: Colors.getTheme().background,
  },
  storiesList: {
    padding: styleNumbers.space,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.getTheme().borderColor,
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: styleNumbers.space,
  },
  storyAvatar: {
    borderWidth: 2,
    borderColor: Colors.getTheme().button,
  },
  storyUsername: {
    ...CommonStyles.textStyles.title,
    marginTop: styleNumbers.space / 2,
  },
  postCard: {
    marginVertical: styleNumbers.space,
    backgroundColor: Colors.getTheme().transition,
    ...CommonStyles.shadowStyle,
  },
  postContainer: {
    padding: styleNumbers.space * 2,
  },
});

export default SocialMediaScreen;
