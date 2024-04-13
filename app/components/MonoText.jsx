import { Text } from 'react-native';

const MonoText = (props) => {
  return <Text {...props} style={[props.style, { fontWeight: 'bold' }]} />;
};

export default MonoText;
