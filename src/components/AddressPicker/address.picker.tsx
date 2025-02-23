import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {FormValues} from '@screens/home/ElectionInfo';
import styleNumbers from '@styles/common/style.numbers';
import Colors from '@styles/common/colors';
import CommonStyles from '@styles/common/commonStyles';

interface AddressPickerComponentProps {
  values: FormValues;
  handleChange: (field: string, value: string) => void;
}

// Türkiye'nin illeri (örnek veri)
const cities = [
  'İstanbul',
  'Ankara',
  'İzmir',
  // Diğer iller eklenebilir
];

// İlçeler için örnek veri (gerçek uygulamada API'den alınabilir)
const districts: {[key: string]: string[]} = {
  İstanbul: ['Kadıköy', 'Beşiktaş', 'Üsküdar', 'Şişli', 'Bakırköy'],
  Ankara: ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut'],
  İzmir: ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Çiğli'],
  // Diğer şehirlerin ilçeleri eklenebilir
};

const AddressPickerComponent = ({
  values,
  handleChange,
}: AddressPickerComponentProps) => {
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (values.city && districts[values.city]) {
      setAvailableDistricts(districts[values.city]);
      // Eğer seçili ilçe, yeni şehrin ilçeleri arasında yoksa ilçe seçimini sıfırla
      if (!districts[values.city].includes(values.district)) {
        handleChange('district', '');
      }
    } else {
      setAvailableDistricts([]);
      handleChange('district', '');
    }
  }, [values.city]);

  return (
    <View style={styles.addressContainer}>
      <View style={styles.pickerContainer}>
        <Text style={[CommonStyles.textStyles.paragraph, styles.label]}>
          Şehir
        </Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={values.city}
            onValueChange={value => handleChange('city', value)}
            style={styles.picker}
            dropdownIconColor={Colors.getTheme().text}>
            <Picker.Item
              label="Şehir Seçiniz"
              value=""
              color={Colors.getTheme().placeholder}
            />
            {cities.map(city => (
              <Picker.Item
                key={city}
                label={city}
                value={city}
                color={Colors.getTheme().text}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={[CommonStyles.textStyles.paragraph, styles.label]}>
          İlçe
        </Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={values.district}
            onValueChange={value => handleChange('district', value)}
            enabled={!!values.city}
            style={styles.picker}
            dropdownIconColor={Colors.getTheme().text}>
            <Picker.Item
              label="İlçe Seçiniz"
              value=""
              color={Colors.getTheme().placeholder}
            />
            {availableDistricts.map(district => (
              <Picker.Item
                key={district}
                label={district}
                value={district}
                color={Colors.getTheme().text}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
};

export default AddressPickerComponent;

const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'column',
    gap: styleNumbers.space,
  },
  pickerContainer: {
    marginTop: styleNumbers.space * 2,
  },
  label: {
    marginBottom: styleNumbers.spaceLittle,
    color: Colors.getTheme().text,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: Colors.getTheme().borderColor,
    borderRadius: styleNumbers.borderRadius,
    backgroundColor: Colors.getTheme().background,
  },
  picker: {
    color: Colors.getTheme().text,
  },
});
