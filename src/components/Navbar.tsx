import React, { useState } from 'react';
import { Box, Flex, Link, Button, Image, Text, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaCrown, FaMusic, FaPause, FaBars } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  React.useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.25;
    audioRef.current.loop = true;
  }, []);

  const NavLinks = () => (
    <>
      <Button
        as={RouterLink}
        to="/"
        leftIcon={<FaCrown />}
        variant="solid"
        colorScheme="yellow"
        fontWeight="700"
        borderRadius="full"
        px={6}
        fontSize={{ base: 'sm', md: 'md' }}
        boxShadow="0 2px 8px rgba(255,215,0,0.15)"
        _hover={{ bg: '#FFD700', color: 'white', boxShadow: '0 4px 16px rgba(255,215,0,0.25)' }}
        w={{ base: '100%', sm: 'auto' }}
      >
        Pokemon list
      </Button>
      <Button
        as={RouterLink}
        to="/team"
        variant="solid"
        bg="#e3e8ff"
        color="#2a2a4a"
        fontWeight="700"
        borderRadius="full"
        px={6}
        fontSize={{ base: 'sm', md: 'md' }}
        boxShadow="0 2px 8px rgba(227,232,255,0.15)"
        _hover={{ bg: '#b6c3f7', color: '#2a2a4a', boxShadow: '0 4px 16px rgba(182,195,247,0.18)' }}
        w={{ base: '100%', sm: 'auto' }}
      >
        My Team
      </Button>
      <Button
        as={RouterLink}
        to="/battle"
        variant="solid"
        bg="#ffe3e3"
        color="#7a2a2a"
        fontWeight="700"
        borderRadius="full"
        px={6}
        fontSize={{ base: 'sm', md: 'md' }}
        boxShadow="0 2px 8px rgba(255,227,227,0.15)"
        _hover={{ bg: '#f7b6b6', color: '#7a2a2a', boxShadow: '0 4px 16px rgba(247,182,182,0.18)' }}
        w={{ base: '100%', sm: 'auto' }}
      >
        Battle
      </Button>
      <Button
        as={RouterLink}
        to="/history"
        variant="solid"
        bg="#ede3ff"
        color="#4a2a7a"
        fontWeight="700"
        borderRadius="full"
        px={6}
        fontSize={{ base: 'sm', md: 'md' }}
        boxShadow="0 2px 8px rgba(237,227,255,0.15)"
        _hover={{ bg: '#cbb6f7', color: '#4a2a7a', boxShadow: '0 4px 16px rgba(203,182,247,0.18)' }}
        w={{ base: '100%', sm: 'auto' }}
      >
        Battle History
      </Button>
    </>
  );

  return (
    <Box
      bg="rgba(255, 255, 255, 0.55)"
      style={{ backdropFilter: 'blur(18px)' }}
      border="2px solid #FFD700"
      boxShadow="0 8px 32px 0 rgba(255, 215, 0, 0.25)"
      borderRadius="2xl"
      position="sticky"
      top={0}
      zIndex={100}
      mx={{ base: 0, md: 4 }}
      mt={4}
      px={{ base: 2, md: 8 }}
      py={3}
    >
      <audio ref={audioRef} src="/pokemon-theme.mp3" preload="auto" />
      <Flex 
        maxW="1200px" 
        mx="auto" 
        align="center" 
        justify="space-between"
      >
        <Flex align="center" gap={3}>
          <Image
            src="/premium-pokeball.svg"
            alt="Premium PokéApp"
            h={{ base: '40px', md: '48px' }}
            borderRadius="full"
            boxShadow="0 2px 8px rgba(255,215,0,0.25)"
            bg="whiteAlpha.800"
            p={1}
            border="2px solid #FFD700"
          />
          <Text 
            fontSize={{ base: 'xl', md: '2xl' }} 
            fontWeight="extrabold" 
            color="#FFD700" 
            letterSpacing="2px" 
            fontFamily="Poppins"
          >
            PokéX Ultra
          </Text>
        </Flex>

        {/* Desktop Navigation */}
        <Flex 
          gap={2} 
          align="center"
          display={{ base: 'none', md: 'flex' }}
        >
          <NavLinks />
          <Button
            onClick={toggleMusic}
            variant="ghost"
            color={playing ? '#FFD700' : '#888'}
            fontSize="2xl"
            aria-label={playing ? 'Pause music' : 'Play music'}
            _hover={{ color: '#FFD700', bg: 'transparent' }}
            minW={0}
            px={2}
          >
            {playing ? <FaPause /> : <FaMusic />}
          </Button>
        </Flex>

        {/* Mobile Navigation */}
        <Flex display={{ base: 'flex', md: 'none' }} align="center" gap={2}>
          <Button
            onClick={toggleMusic}
            variant="ghost"
            color={playing ? '#FFD700' : '#888'}
            fontSize="2xl"
            aria-label={playing ? 'Pause music' : 'Play music'}
            _hover={{ color: '#FFD700', bg: 'transparent' }}
            minW={0}
            px={2}
          >
            {playing ? <FaPause /> : <FaMusic />}
          </Button>
          <IconButton
            aria-label="Open menu"
            icon={<FaBars />}
            variant="ghost"
            color="#FFD700"
            fontSize="xl"
            onClick={onOpen}
          />
        </Flex>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="rgba(255, 255, 255, 0.95)" backdropFilter="blur(18px)">
          <DrawerCloseButton color="#FFD700" />
          <DrawerBody py={8}>
            <VStack spacing={4} align="stretch">
              <NavLinks />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar; 