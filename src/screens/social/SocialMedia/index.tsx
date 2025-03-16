import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Card, Text, Avatar, IconButton} from 'react-native-paper';
import styleNumbers from '@styles/common/style.numbers';
import {ColorsSchema} from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';
import {useStyles} from '@hooks/Modular/use.styles';
interface Candidate {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
}

interface Story {
  id: string;
  image: string;
  content: string;
  candidate: Candidate;
}

interface Post {
  id: string;
  image: string;
  content: string;
  socialMedia: {id: string};
  candidate: Candidate;
  likes: any[];
  comments: any[];
}

const SocialMediaScreen: React.FC = () => {
  const styles = useStyles(createStyles);
  const demoCandidate: Candidate = {
    id: '1',
    name: 'John Doe',
    description: 'Bu bir açıklama',
    image: '',
    color: '#000000',
  };

  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      image: '',
      content: '1Bu bir hikaye içeriğidir.',
      candidate: demoCandidate,
    },
    {
      id: '2',
      image: '',
      content: '2Bu bir hikaye içeriğidir.',
      candidate: demoCandidate,
    },
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      image: '',
      content: '',
      socialMedia: {id: '1'},
      candidate: demoCandidate,
      likes: [],
      comments: [],
    },
    {
      id: '2',
      image: '',
      content: '',
      socialMedia: {id: '2'},
      candidate: demoCandidate,
      likes: [],
      comments: [],
    },
  ]);

  const renderStory = ({item}: {item: Story}) => (
    <View style={styles.storyContainer}>
      <Avatar.Image
        size={60}
        source={{uri: item.image || 'https://via.placeholder.com/60'}}
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
            <Avatar.Image
              {...props}
              size={40}
              source={{uri: item.image || 'https://via.placeholder.com/40'}}
            />
          )}
        />
        <Card.Content>
          <Text>{item.content || 'İçerik yok'}</Text>
        </Card.Content>
        {item.image && <Card.Cover source={{uri: item.image}} />}
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
              keyExtractor={item => item.id}
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

const createStyles = (colors: ColorsSchema) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    storiesList: {
      padding: styleNumbers.space,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.borderColor,
    },
    storyContainer: {
      alignItems: 'center',
      marginHorizontal: styleNumbers.space,
    },
    storyAvatar: {
      borderWidth: 2,
      borderColor: colors.button,
    },
    storyUsername: {
      ...CommonStyles.textStyles.title,
      marginTop: styleNumbers.space / 2,
    },
    postCard: {
      marginVertical: styleNumbers.space,
      backgroundColor: colors.transition,
      ...CommonStyles.shadowStyle,
    },
    postContainer: {
      padding: styleNumbers.space * 2,
    },
  });

export default SocialMediaScreen;
